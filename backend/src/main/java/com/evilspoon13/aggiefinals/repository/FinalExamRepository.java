package com.evilspoon13.aggiefinals.repository;

import com.evilspoon13.aggiefinals.model.FinalExam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface FinalExamRepository extends JpaRepository<FinalExam, Long> {

    List<FinalExam> findByTermId(String termId);

    List<FinalExam> findByTermIdAndDayPattern(String termId, String dayPattern);

    Optional<FinalExam> findByTermIdAndDayPatternAndClassBeginTimeAndClassEndTime(
            String termId, String dayPattern, LocalTime classBeginTime, LocalTime classEndTime
    );
}