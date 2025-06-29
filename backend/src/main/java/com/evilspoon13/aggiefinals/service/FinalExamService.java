package com.evilspoon13.aggiefinals.service;

import com.evilspoon13.aggiefinals.dto.ExamRequest;
import com.evilspoon13.aggiefinals.model.FinalExam;
import com.evilspoon13.aggiefinals.repository.FinalExamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class FinalExamService {

    @Autowired
    private FinalExamRepository finalExamRepo;

    public List<FinalExam> getAllExamsByTermId(String termId) {
        return finalExamRepo.findByTermId(termId);
    }

    public Optional<FinalExam> searchExam(ExamRequest examRequest) {
        String termId = examRequest.getTermId();
        String dayPattern = examRequest.getDayPattern();
        LocalTime classStartTime = LocalTime.parse(examRequest.getClassStartTime());
        LocalTime classEndTime = LocalTime.parse(examRequest.getClassEndTime());

        List<FinalExam> allForPattern = finalExamRepo.findByTermIdAndDayPattern(termId, dayPattern);

        Optional<FinalExam> result = finalExamRepo.findByTermIdAndDayPatternAndClassBeginTimeAndClassEndTime(
                termId, dayPattern, classStartTime, classEndTime
        );

        return result;
    }
}
