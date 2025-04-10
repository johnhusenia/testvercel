package reactjavaproject.john.config;

import java.io.IOException;

import org.springframework.context.ApplicationContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import reactjavaproject.john.services.JwtService;
import reactjavaproject.john.services.MyUserDetailService;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    ApplicationContext context;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        String token = null;
        String email = null;
    
        if(authHeader != null && authHeader.startsWith("Bearer ")){
            token = authHeader.substring(7);
            email = jwtService.extractEmail(token);
            System.out.println("Extracted email: " + email);  // Debug log
        }
    
        if(email != null && SecurityContextHolder.getContext().getAuthentication() == null){
            UserDetails userdetails = context.getBean(MyUserDetailService.class).loadUserByUsername(email);
            System.out.println("User found: " + userdetails.getUsername());  // Debug log
    
            if (jwtService.validateToken(token, userdetails)) {
                System.out.println("Token is valid, authenticating user");  // Debug log
                
                // Print the user credentials (username, authorities, and password)
                System.out.println("User details: ");
                System.out.println("Username: " + userdetails.getUsername());  // Print username
                System.out.println("Password: " + userdetails.getPassword());  // Print password (ensure this is safe for debugging)
                System.out.println("Authorities: " + userdetails.getAuthorities());  // Print authorities/roles
                
                UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(userdetails, null, userdetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
            
        }
        filterChain.doFilter(request, response);
    }

}
