package com.claim.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.claim.entity.Team;

@Repository
public interface TeamRepository extends JpaRepository<Team, Integer> {

	@Query ("SELECT T FROM Team T WHERE T.user.email = ?1")
	Team findTeamByEmail(String email);
}
