package reactjavaproject.john.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactjavaproject.john.models.Data;
import reactjavaproject.john.repositories.PostRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/media")
public class PostController {
    @Autowired
    private PostRepository repo;

    @GetMapping("/alldata")
    public List<Data> getAllData() {
        return repo.findAll();
    }

    @GetMapping("/movies")
    public List<Data> getMovies() {
        return repo.findByCategory("movie");
    }

    @GetMapping("/series")
    public List<Data> getSeries() {
        return repo.findByCategory("series");
    }

    @GetMapping("/item")
    public Data getItemById(@RequestParam String id) {
        Optional<Data> result = repo.findById(id);
        return result.orElseThrow(() -> new RuntimeException("Data not found with ID: " + id));
    }

    @GetMapping("/genre")
    public List<Data> getItemsByGenre(@RequestParam List<String> genres) {
        List<Data> filteredItems = repo.findByGenreIn(genres);
        if (filteredItems.isEmpty()) {
            throw new RuntimeException("No items found for genres: " + String.join(", ", genres));
        }
        return filteredItems;
    }
}
