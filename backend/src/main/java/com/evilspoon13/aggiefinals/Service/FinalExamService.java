package com.evilspoon13.aggiefinals.Service;

import com.evilspoon13.aggiefinals.Model.FinalExam;
import com.evilspoon13.aggiefinals.Repo.FinalExamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FinalExamService{

    private final FinalExamRepository examRepo;

    @Autowired
    public FinalExamService(FinalExamRepository examRepo){
        this.examRepo = examRepo;
    }

    public FinalExam addExam(FinalExam exam) {
        return examRepo.save(exam);
    }
}
