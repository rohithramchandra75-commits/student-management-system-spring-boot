package com.cse.student.service;

import com.cse.student.entity.Users;
import com.cse.student.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsersService {

    @Autowired
    private UsersRepository repository;

    public Users saveUser(Users user) {
        return repository.save(user);
    }

    public Users login(String email, String password) {

        Users user = repository.findByEmail(email);

        if (user != null && user.getPassword().equals(password)) {
            return user;
        }

        return null;
    }

    public List<Users> getAllUsers() {
        return repository.findAll();
    }

    public long totalUsers() {
        return repository.count();
    }

    public Users getUserById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void deleteUser(Long id) {
        repository.deleteById(id);
    }

    public List<Users> searchUsers(String name) {
        return repository.findByNameContainingIgnoreCase(name);
    }

    public Users updateUser(Users user) {
        return repository.save(user);
    }

}