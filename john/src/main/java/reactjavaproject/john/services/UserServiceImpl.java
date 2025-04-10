package reactjavaproject.john.services;

import reactjavaproject.john.models.User;
import reactjavaproject.john.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    AuthenticationManager authManager;

    @Autowired
    private JwtService jwtService;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Fetch all users from the database
    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    

    // Create a new user
    @Override
    public Optional<User> createUser(User user) {
        // Check if the user already exists
        if (userRepository.existsByEmail(user.getEmail())) {
            return Optional.empty(); // User already exists
        }

        // Encode the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Save the user to the database
        return Optional.of(userRepository.save(user));
    }

    // Fetch a user by their ID
    @Override
    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }

    // Fetch a user by their email
 

    @Override
    public Optional<User> updateUser(String id, User user) {
        return userRepository.findById(id).map(existingUser -> {
            if (user.getName() != null) existingUser.setName(user.getName());
            if (user.getEmail() != null) existingUser.setEmail(user.getEmail());
            if (user.getPassword() != null) {
                existingUser.setPassword(passwordEncoder.encode(user.getPassword()));
            }
            return userRepository.save(existingUser);
        });
    }

    @Override
    public boolean deleteUser(String id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }
    @Override
    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }


    @Override
    public ResponseEntity<User> getUserByEmail(String email) {
        User user = userRepository.findByEmail(email); // This can return a User or null
    
        if (user != null) {
            // Set password to null to exclude it from the response
            user.setPassword(null);
    
            return ResponseEntity.ok(user); // Return user with 200 OK if found
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Return 404 if not found
        }
    }



    @Override
    public Map<String, Object> verify(User user) {
        Map<String, Object> response = new HashMap<>();  // Always return this map
    
        try {
            // Try to authenticate the user
            Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
            );
    
            // If authentication is successful
            if (authentication.isAuthenticated()) {
                // Generate the token
                String token = jwtService.generateToken(user.getEmail());
    
                // Add message, token, and email to the response map
                response.put("message", "Login successful");
                response.put("token", token);
                response.put("email", user.getEmail());  // Add email address to response
    
                // Optional: Print email and token for debugging
                System.out.println("Authenticated user email: " + user.getEmail());
                System.out.println("Generated JWT Token: " + token);
            } else {
                // If authentication fails, add error message to response
                response.put("error", "Invalid email or password");
            }
        } catch (Exception e) {
            // Handle any exceptions and add error message
            response.put("error", "Authentication failed: " + e.getMessage());
        }
    
        return response;  // Always return Map<String, Object>
    }



    

}
