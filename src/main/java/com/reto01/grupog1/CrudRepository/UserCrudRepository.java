package com.reto01.grupog1.CrudRepository;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;

import org.springframework.data.repository.CrudRepository;

import com.reto01.grupog1.Entities.User;

public interface UserCrudRepository extends CrudRepository<User, Long> {

    @Query(value = "SELECT * FROM users WHERE user_email = ?", nativeQuery = true)
    public Optional<User> findbyEmail(String email);

    @Query(value = "SELECT * FROM users WHERE user_email = ? and user_password = ?", nativeQuery = true)
    public Optional<User> findbyEmailandPassword(String email, String password);
}
