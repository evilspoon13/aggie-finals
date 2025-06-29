package com.evilspoon13.aggiefinals.service;

import com.evilspoon13.aggiefinals.model.Subject;
import com.evilspoon13.aggiefinals.repository.SubjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubjectService {

    private final SubjectRepository subjectRepo;

    public SubjectService(SubjectRepository subjectRepo) {
        this.subjectRepo = subjectRepo;
    }

    public long count() {
        return subjectRepo.count();
    }

    public List<Subject> getAllSubjects() {
        return subjectRepo.findAll();
    }
}
