package com.claim.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.claim.entity.Player;

@Repository 
@Transactional

public interface PlayerRepository extends JpaRepository<Player, Integer> {
	@Query("SELECT P FROM Player P WHERE P.team.id=?1")
	List<Player> findAllById(int id);
	
	@Modifying
	@Query("DELETE FROM Player P WHERE P.id =?1")
	void deletePlayerById(int id);
	
}
