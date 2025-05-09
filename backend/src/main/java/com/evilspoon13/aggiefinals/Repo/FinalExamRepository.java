package com.evilspoon13.aggiefinals.Repo;

import com.evilspoon13.aggiefinals.Model.FinalExam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FinalExamRepository extends JpaRepository<FinalExam, Long> {


}
