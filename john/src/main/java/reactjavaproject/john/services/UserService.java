package reactjavaproject.john.services;

import reactjavaproject.john.models.User;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.ResponseEntity;


public interface UserService {


    List<User> getAllUsers();
    Optional<User> createUser(User user);
    Optional<User> getUserById(String id); 
    ResponseEntity<User> getUserByEmail(String email); 
    boolean emailExists(String email);
    Optional<User> updateUser(String id, User user);
    boolean deleteUser(String id);
    public Map<String, Object> verify(User user);
}
