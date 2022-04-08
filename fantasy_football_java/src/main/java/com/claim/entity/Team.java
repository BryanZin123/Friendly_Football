package com.claim.entity;

import javax.persistence.*;

@Entity
@Table(name="team")
public class Team {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	@Column(name="name")
	private String name;
	
	@Column(name="total_score")
	private String teamTotalScore;
	
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="user_email")
 	private User user;


	public Team(int id, String name, String teamTotalScore, User user) {
		this.id = id;
		this.name = name;
		this.teamTotalScore = teamTotalScore;
		this.user = user;
	}
	
	public Team() {}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTeamTotalScore() {
		return teamTotalScore;
	}

	public void setTeamTotalScore(String teamTotalScore) {
		this.teamTotalScore = teamTotalScore;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	
	
}
