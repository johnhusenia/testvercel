package reactjavaproject.john.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import reactjavaproject.john.models.Data;

public interface PostRepository extends MongoRepository<Data, String> {
    List<Data> findByCategory(String category);
    List<Data> findByGenreIn(List<String> genre); // Works for List<String> field
}
