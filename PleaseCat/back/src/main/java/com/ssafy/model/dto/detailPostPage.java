package com.ssafy.model.dto;

public class detailPostPage {
	private String user_id;
	private String user_image;
	private String comment_content;
	private String comment_time;
	private int comment_no;
	
	public detailPostPage() {}

	public detailPostPage(String user_id, String user_image, String comment_content, String comment_time, int comment_no) {
		super();
		this.user_id = user_id;
		this.user_image = user_image;
		this.comment_content = comment_content;
		this.comment_time = comment_time;
		this.comment_no = comment_no;
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

	public String getComment_content() {
		return comment_content;
	}

	public void setComment_content(String comment_content) {
		this.comment_content = comment_content;
	}

	public String getComment_time() {
		return comment_time;
	}

	public void setComment_time(String comment_time) {
		this.comment_time = comment_time;
	}
	
	public int getComment_no() {
		return comment_no;
	}

	public void setComment_no(int comment_no) {
		this.comment_no = comment_no;
	}

	@Override
	public String toString() {
		return "commentPage [user_id=" + user_id + ", user_image=" + user_image + ", comment_content=" + comment_content
				+ ", comment_time=" + comment_time + ", comment_no=" + comment_no + "]";
	}
}