package com.cse.student.controller;

import com.cse.student.entity.Users;
import com.cse.student.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class UsersController {

    @Autowired
    private UsersService service;

    // Home Page
    @GetMapping("/")
    public String home() {
        return "index";
    }

    // Register Page
    @GetMapping("/register")
    public String registerPage(Model model) {

        model.addAttribute("user", new Users());

        return "register";
    }

    // Register User
    @PostMapping("/register")
    public String register(@ModelAttribute Users user) {

        service.saveUser(user);

        return "redirect:/login";
    }

    // Login Page
    @GetMapping("/login")
    public String loginPage() {

        return "login";
    }

    // Login User
    @PostMapping("/login")
    public String login(@RequestParam String email,
                        @RequestParam String password,
                        Model model) {

        Users user = service.login(email, password);

        if (user != null) {

            model.addAttribute("user", user);
            model.addAttribute("users", service.getAllUsers());
            model.addAttribute("count", service.totalUsers());

            return "dashboard";
        }

        model.addAttribute("error", "Invalid Email or Password");

        return "login";
    }

    // Dashboard
    @GetMapping("/dashboard")
    public String dashboard(Model model) {

        model.addAttribute("users", service.getAllUsers());
        model.addAttribute("count", service.totalUsers());

        return "dashboard";
    }

    // Search Student
    @GetMapping("/search")
    public String search(@RequestParam String name,
                         Model model) {

        List<Users> users = service.searchUsers(name);

        model.addAttribute("users", users);
        model.addAttribute("count", users.size());

        return "dashboard";
    }

    // Edit Student
    @GetMapping("/edit/{id}")
    public String edit(@PathVariable Long id,
                       Model model) {

        Users user = service.getUserById(id);

        model.addAttribute("user", user);

        return "edit";
    }

    // Update Student
    @PostMapping("/update")
    public String update(@ModelAttribute Users user) {

        service.updateUser(user);

        return "redirect:/dashboard";
    }

    // Delete Student
    @GetMapping("/delete/{id}")
    public String delete(@PathVariable Long id) {

        service.deleteUser(id);

        return "redirect:/dashboard";
    }

    // Logout
    @GetMapping("/logout")
    public String logout() {

        return "redirect:/";
    }

}