package com.edutrack.repository;

import com.edutrack.entity.BlackListedToken;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface BlacklistTokenRepository extends JpaRepository<BlackListedToken,Long> {

    Optional<BlackListedToken> findByToken(String token);

    boolean existsByToken(String token);
}
