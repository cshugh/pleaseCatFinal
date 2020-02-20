package com.ssafy.model.dto;

public class likes {
	private int user_no;
	private int post_no;
	private int chk;
	
	public likes() {}
	public likes(int user_no, int post_no, int chk) {
		super();
		this.user_no = user_no;
		this.post_no = post_no;
		this.chk = chk;
	}
	public int getUser_no() {
		return user_no;
	}
	public void setUser_no(int user_no) {
		this.user_no = user_no;
	}
	public int getPost_no() {
		return post_no;
	}
	public void setPost_no(int post_no) {
		this.post_no = post_no;
	}
	public int getCheck() {
		return chk;
	}
	public void setCheck(int check) {
		this.chk = check;
	}
	@Override
	public String toString() {
		return "likes [user_no=" + user_no + ", post_no=" + post_no + ", chk=" + chk + "]";
	}
}
