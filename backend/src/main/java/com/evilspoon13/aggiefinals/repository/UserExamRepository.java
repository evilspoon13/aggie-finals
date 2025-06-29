package com.evilspoon13.aggiefinals.repository;

import com.evilspoon13.aggiefinals.model.UserExam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface UserExamRepository extends JpaRepository<UserExam, Long> {

    Set<UserExam> findByGoogleId(String googleId);

    Optional<UserExam> findByExamIdAndGoogleId(Long examId, String googleId);
}
