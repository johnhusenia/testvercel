package reactjavaproject.john.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import reactjavaproject.john.models.User;

public interface UserRepository extends MongoRepository<User, String> {
    boolean existsByEmail(String email); // Check if email already exists

    User findByEmail(String email); 
}