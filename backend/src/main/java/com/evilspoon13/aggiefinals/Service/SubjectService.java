package com.evilspoon13.aggiefinals.Service;

import com.evilspoon13.aggiefinals.Model.Subject;
import com.evilspoon13.aggiefinals.Repository.SubjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubjectService {

    private final SubjectRepository subjectRepo;

    public SubjectService(SubjectRepository subjectRepo) {
        this.subjectRepo = subjectRepo;
    }

    public List<Subject> getAllSubjects() {
        return subjectRepo.findAll();
    }
}
