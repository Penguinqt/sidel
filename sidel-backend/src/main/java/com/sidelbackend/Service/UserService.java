package com.sidelbackend.Service;


import com.sidelbackend.Entity.UserEntity;
import com.sidelbackend.Repositories.UserRepositories;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepositories userRepository;

    public UserService(UserRepositories userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    public UserEntity getById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public UserEntity createUser(UserEntity user) {
        return userRepository.save(user);
    }
    public UserEntity getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    public UserEntity updateUser(Long id, UserEntity newData) {
        UserEntity u = getById(id);
        if (u == null) return null;

        u.setName(newData.getName());
        u.setEmail(newData.getEmail());
        u.setPassword(newData.getPassword());
        u.setPhoneNumber(newData.getPhoneNumber());
        u.setAddress(newData.getAddress());

        return userRepository.save(u);
    }

    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    public UserEntity login(String email, String password) {
        return userRepository.findByEmail(email)
                .filter(user -> user.getPassword().equals(password))
                .orElse(null);
    }
}
