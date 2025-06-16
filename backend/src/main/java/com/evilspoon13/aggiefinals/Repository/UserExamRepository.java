package com.evilspoon13.aggiefinals.Repository;

import com.evilspoon13.aggiefinals.Model.FinalExam;
import com.evilspoon13.aggiefinals.Model.UserExam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface UserExamRepository extends JpaRepository<UserExam, Long> {

    Set<UserExam> findByUserId(String userId);

    Optional<UserExam> findByExamIdAndUserId(Long examId, String userId);
}
