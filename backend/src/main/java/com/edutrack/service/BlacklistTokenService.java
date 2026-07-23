package com.edutrack.service;

import com.edutrack.entity.BlackListedToken;
import com.edutrack.repository.BlacklistTokenRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class BlacklistTokenService {

    private final BlacklistTokenRepository repository;

    public BlacklistTokenService(BlacklistTokenRepository repository) {
        this.repository = repository;
    }

    public void blackListToken(String token) {
        BlackListedToken blackList = new BlackListedToken();

        blackList.setToken(token);
        blackList.setExpiryDate(LocalDateTime.now().plusHours(1));

        repository.save(blackList);
    }

    public boolean isBlackListed(String token) {
        return repository.existsByToken(token);
    }
}
