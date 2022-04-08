package com.claim.Fantasy_Footall;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages="com.claim")

public class FantasyFootallApplication {

	public static void main(String[] args) {
		SpringApplication.run(FantasyFootallApplication.class, args);
	}

}
