package com.claim.entity;

import javax.persistence.*;

@Entity
@Table(name="user")
public class User {

	@Id
	@Column(name="email")
	private String email;
	
	@Column(name="first_name")
	private String userFirstName;
	
	@Column(name="last_name")
	private String userLastName;
	
	@Column(name="password")
	private String userPassword;


	public User(String email, String userFirstName, String userLastName, String userPassword) {
		this.email = email;
		this.userFirstName = userFirstName;
		this.userLastName = userLastName;
		this.userPassword = userPassword;
	}

	public User() {}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUserFirstName() {
		return userFirstName;
	}

	public void setUserFirstName(String userFirstName) {
		this.userFirstName = userFirstName;
	}

	public String getUserLastName() {
		return userLastName;
	}

	public void setUserLastName(String userLastName) {
		this.userLastName = userLastName;
	}

	public String getUserPassword() {
		return userPassword;
	}

	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}
	
	
}
