package com.reto01.grupog1.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reto01.grupog1.Entities.User;
import com.reto01.grupog1.Repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getAll() {
        return (List<User>) userRepository.getAll();
    }

    public User addUser(User user) {
        return userRepository.addUser(user);
    }

    public Boolean getValidateEmail(String email) {
        return userRepository.getValidateEmail(email);
    }

    public User getLogin(String email, String password) {
        return userRepository.getLogin(email, password);
    }

}
