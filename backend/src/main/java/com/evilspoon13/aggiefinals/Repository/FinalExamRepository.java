package com.evilspoon13.aggiefinals.Repository;

import com.evilspoon13.aggiefinals.Model.FinalExam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FinalExamRepository extends JpaRepository<FinalExam, Long> {
}