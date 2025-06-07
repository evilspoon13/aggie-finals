package com.evilspoon13.aggiefinals.Repository;

import com.evilspoon13.aggiefinals.Model.FinalExam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface FinalExamRepository extends JpaRepository<FinalExam, Long> {

    List<FinalExam> findByTermId(String termId);

    // Add this method to help with debugging
    List<FinalExam> findByTermIdAndDayPattern(String termId, String dayPattern);

    Optional<FinalExam> findByTermIdAndDayPatternAndClassBeginTimeAndClassEndTime(
            String termId, String dayPattern, LocalTime classBeginTime, LocalTime classEndTime
    );
}