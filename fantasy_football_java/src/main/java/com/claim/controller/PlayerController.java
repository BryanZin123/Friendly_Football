package com.claim.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.claim.entity.Player;
import com.claim.entity.Team;
import com.claim.repository.PlayerRepository;
import com.claim.repository.TeamRepository;

@CrossOrigin
@RestController
public class PlayerController {

	@Autowired
	private TeamRepository teamRepository;
	
	@Autowired
	private PlayerRepository playerRepository;
	
	
	@RequestMapping(value="/findAllPlayer",
			produces=MediaType.APPLICATION_JSON_VALUE,
			method=RequestMethod.GET
			)
	@ResponseBody
	private ResponseEntity <List<Player>>findAllPlayerByTeamId(int id)
	{
		return new ResponseEntity<>(playerRepository.findAllById(id),HttpStatus.OK);
	}
	
	
	
	@RequestMapping(value="/savePlayer",
			consumes=MediaType.APPLICATION_JSON_VALUE,
			produces=MediaType.APPLICATION_JSON_VALUE,
			method=RequestMethod.POST)
	private void submitPlayer(@RequestBody Player player) {
		Team team = teamRepository.findById(player.getTeam().getId()).get();
		player.setTeam(team);
		playerRepository.save(player);
	}
	
	
	@RequestMapping(value="/findPlayerById",
			produces=MediaType.APPLICATION_JSON_VALUE,
			 method= RequestMethod.GET
			)
	@ResponseBody
	private ResponseEntity <Optional<Player>>findPlayerById(int id)
	{
		return new ResponseEntity<>(playerRepository.findById(id), HttpStatus.OK);
	}
	
	
	@RequestMapping(value="/deletePlayerById",
			produces=MediaType.APPLICATION_JSON_VALUE,
			 method= RequestMethod.DELETE
			)
	@ResponseBody
	private ResponseEntity <Optional<Player>>deletePlayerById(int id)
	{    
		//Player player = playerRepository.findById(id)
		//return playerRepository.deleteById(id)
		playerRepository.deletePlayerById(id);
		return new ResponseEntity<>( HttpStatus.OK);
	}
	
}
