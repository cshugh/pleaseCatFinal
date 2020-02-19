package com.ssafy.model.dto;

public class detailPostInfo {
	
	private String post_image;
	private String post_content;
	private String user_id;
	private String user_image;
	private int user_no;
	
	public detailPostInfo() {}
	
	public detailPostInfo(String post_image, String post_content, String user_id, String user_image, int user_no) {
		super();
		this.post_image = post_image;
		this.post_content = post_content;
		this.user_id = user_id;
		this.user_image = user_image;
		this.user_no = user_no;
	}
	
	public int getUser_no() {
		return user_no;
	}

	public void setUser_no(int user_no) {
		this.user_no = user_no;
	}

	public String getPost_image() {
		return post_image;
	}

	public void setPost_image(String post_image) {
		this.post_image = post_image;
	}

	public String getPost_content() {
		return post_content;
	}

	public void setPost_content(String post_content) {
		this.post_content = post_content;
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
		return "detailPostInfo [post_image=" + post_image + ", post_content=" + post_content + ", user_id=" + user_id
				+ ", user_image=" + user_image + "]";
	}
}
