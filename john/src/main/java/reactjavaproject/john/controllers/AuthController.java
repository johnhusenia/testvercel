package reactjavaproject.john.controllers;

import reactjavaproject.john.models.User;
import reactjavaproject.john.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    // Method to get all users
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    // Method to register or create a new user
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(@RequestBody User user, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            // Handle validation errors and return appropriate response
            String errorMessage = bindingResult.getAllErrors().stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .collect(Collectors.joining(", "));
            return ResponseEntity.badRequest().body(Map.of("error", errorMessage));
        }

        // Logic to save the user (this should be handled in UserService)
        Optional<User> createdUser = userService.createUser(user);

        if (createdUser.isPresent()) {
            return ResponseEntity.ok(Map.of("message", "User registered successfully"));
        } else {
            return ResponseEntity.status(500).body(Map.of("error", "Failed to register user"));
        }
    }

    // Method to get user data by ID
    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUserById(@PathVariable String id) {
        Optional<User> user = userService.getUserById(id);
        return user.map(ResponseEntity::ok)
                   .orElseGet(() -> ResponseEntity.status(404).body(null));
    }


    @GetMapping("/user/email")
    public ResponseEntity<User> getEmail() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userService.getUserByEmail(email);  
    }



        // Login user - matches LoginPage.js
        @PostMapping("/login")
        public ResponseEntity<Map<String, Object>> loginUser(@RequestBody User user) {
            // Call the verify method which returns a map containing the message and token
            Map<String, Object> response = userService.verify(user);
        
            // Return the map with either a success or failure response
            if (response.containsKey("message")) {
                return ResponseEntity.ok(response);  // Login successful, return message and token
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);  // Authentication failure
            }
        }
        
    
        
    @PutMapping("/user/{id}")
    public ResponseEntity<?> updateUser(
            @PathVariable String id,
            @Valid @RequestBody User user,
            BindingResult bindingResult) {
        
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Validation failed"));
        }

        return userService.updateUser(id, user)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable String id) {
        if (userService.deleteUser(id)) {
            return ResponseEntity.ok(Map.of("message", "User deleted"));
        }
        return ResponseEntity.notFound().build();
    }
    
}
