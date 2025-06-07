package com.evilspoon13.aggiefinals.Repository;

import com.evilspoon13.aggiefinals.Model.FinalExam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface FinalExamRepository extends JpaRepository<FinalExam, Long> {

    List<FinalExam> findByTermId(String termId);


    @Query("""
    SELECT f FROM FinalExam f 
    WHERE f.termId = :termId 
    AND f.dayPattern = :dayPattern 
    AND f.classBeginTime = :classStart 
    AND f.classEndTime = :classEnd
    """)
    Optional<FinalExam> findByClassSchedule(
            String termId, String dayPattern,
            LocalTime classStart, LocalTime classEnd
    );
}