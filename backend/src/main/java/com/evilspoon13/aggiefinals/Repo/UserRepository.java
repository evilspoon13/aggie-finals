package com.evilspoon13.aggiefinals.Repo;

import com.evilspoon13.aggiefinals.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{

    Optional<User> findByGoogleId(String googleId);

}
