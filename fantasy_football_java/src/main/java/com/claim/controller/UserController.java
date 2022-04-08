package com.claim.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.claim.entity.User;
import com.claim.repository.UserRepository;

@CrossOrigin
@RestController
public class UserController {

	@Autowired
	private UserRepository userRepository;
	
	@RequestMapping(value="/save",
			consumes=MediaType.APPLICATION_JSON_VALUE,
			produces=MediaType.APPLICATION_JSON_VALUE,
			method=RequestMethod.POST)
	private void submitUserDetails(@RequestBody User user) 
	{
		userRepository.save(user);
	}
	
	
	@RequestMapping(value="/login",
			consumes=MediaType.APPLICATION_JSON_VALUE,
			produces=MediaType.APPLICATION_JSON_VALUE,
			method=RequestMethod.POST)
	private ResponseEntity<User> loginUser(@RequestBody User user) 
	{	
		User loginUser = userRepository.findUserByEmailAndPassword(user.getEmail(), user.getUserPassword());
		if(loginUser!=null) {
			return new ResponseEntity<>(loginUser, HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
	}
	
	
}
