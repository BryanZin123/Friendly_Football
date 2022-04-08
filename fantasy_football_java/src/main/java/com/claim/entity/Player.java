package com.claim.entity;

import javax.persistence.*;

@Entity
@Table(name="player")
public class Player {

	@Id
	@Column(name="id")
	private int playerId;
	
	@Column(name="position")
	private String playerPos;
	
	@Column(name="first_name")
	private String playerFirstName;
	
	@Column(name="last_name")
	private String playerLastName;
	
	@Column(name="number")
	private int playerNumber;
	
	@ManyToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="team_id")
	private Team team;

	public Player(int playerId, String playerPos, String playerFirstName, String playerLastName, int playerNumber,
			Team team) {
		this.playerId = playerId;
		this.playerPos = playerPos;
		this.playerFirstName = playerFirstName;
		this.playerLastName = playerLastName;
		this.playerNumber = playerNumber;
		this.team = team;
	}
	
	public Player() {}

	public int getPlayerId() {
		return playerId;
	}

	public void setPlayerId(int playerId) {
		this.playerId = playerId;
	}

	public String getPlayerPos() {
		return playerPos;
	}

	public void setPlayerPos(String playerPos) {
		this.playerPos = playerPos;
	}

	public String getPlayerFirstName() {
		return playerFirstName;
	}

	public void setPlayerFirstName(String playerFirstName) {
		this.playerFirstName = playerFirstName;
	}

	public String getPlayerLastName() {
		return playerLastName;
	}

	public void setPlayerLastName(String playerLastName) {
		this.playerLastName = playerLastName;
	}

	public int getPlayerNumber() {
		return playerNumber;
	}

	public void setPlayerNumber(int playerNumber) {
		this.playerNumber = playerNumber;
	}

	public Team getTeam() {
		return team;
	}

	public void setTeam(Team team) {
		this.team = team;
	}
	
	
	
}
