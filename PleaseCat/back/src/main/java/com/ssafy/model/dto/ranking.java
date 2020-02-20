package com.ssafy.model.dto;

public class ranking {
	private int user_no;
	private int rank_point; 
	private String user_id;
	private String user_image;
	
	public ranking() {
		super();
	}

	public ranking(int user_no, int rank_point, String user_id, String user_image) {
		super();
		this.user_no = user_no;
		this.rank_point = rank_point;
		this.user_id = user_id;
		this.user_image = user_image;
	}

	public int getUser_no() {
		return user_no;
	}

	public void setUser_no(int user_no) {
		this.user_no = user_no;
	}

	public int getRank_point() {
		return rank_point;
	}

	public void setRank_point(int rank_point) {
		this.rank_point = rank_point;
	}

	public String getUser_id() {
		return user_id;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	public String getUser_image() {
		return user_image;
	}

	public void setUser_image(String user_image) {
		this.user_image = user_image;
	}

	@Override
	public String toString() {
		return "ranking [user_no=" + user_no + ", rank_point=" + rank_point + ", user_id=" + user_id + ", user_image="
				+ user_image + "]";
	}
}
