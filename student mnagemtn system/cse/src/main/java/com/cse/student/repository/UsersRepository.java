package com.cse.student.repository;

import com.cse.student.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsersRepository extends JpaRepository<Users, Long> {

    Users findByEmail(String email);

    List<Users> findByNameContainingIgnoreCase(String name);

}