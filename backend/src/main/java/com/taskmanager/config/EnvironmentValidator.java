package com.taskmanager.config;

import org.springframework.boot.context.event.ApplicationStartedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class EnvironmentValidator {
    private static final Logger logger = LoggerFactory.getLogger(EnvironmentValidator.class);
    private final Environment environment;

    public EnvironmentValidator(Environment environment) {
        this.environment = environment;
    }

    @EventListener
    public void onApplicationStarted(ApplicationStartedEvent event) {
        validateEnvironmentVariables();
    }

    private void validateEnvironmentVariables() {
        String[] requiredVariables = {
            "JWT_SECRET",
            "POSTGRES_DB",
            "POSTGRES_USER",
            "POSTGRES_PASSWORD"
        };

        boolean allValid = true;
        for (String variable : requiredVariables) {
            String value = environment.getProperty(variable);
            if (value == null || value.trim().isEmpty()) {
                logger.error("Required environment variable {} is not set", variable);
                allValid = false;
            }
        }

        if (!allValid) {
            throw new IllegalStateException("Required environment variables are missing");
        }

        logger.info("All required environment variables are properly configured");
    }
} 