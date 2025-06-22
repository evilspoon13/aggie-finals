package com.evilspoon13.aggiefinals.Repository;

import com.evilspoon13.aggiefinals.Model.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {
    Subject findByShortName(String shortName);
    Subject findByLongName(String longName);
}
