package com.ssafy.model.dto;

public class alarm {
	private String msg;
	private int no;

	public alarm(String msg, int no) {
		super();
		this.msg = msg;
		this.no = no;
	}

	public alarm(String commentId, String content, String comment, int cnt, int no) {
		super();
		this.msg = commentId + "님 외" + cnt + "명이 '" + (content.length() > 8 ? (content.substring(0, 7) + "...'") : content) + "글에 댓글을 달았습니다.";
		this.no = no;
	}

	public alarm(String likeId, String content, int cnt, int no) {
		super();
		this.msg = likeId + "님 외"+ cnt +"명이 '"+ (content.length() > 8 ? (content.substring(0, 7) + "...'") : content) + "글에 좋아요를 표시했습니다.";
		this.no = no;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public int getNo() {
		return no;
	}

	public void setNo(int no) {
		this.no = no;
	}

	@Override
	public String toString() {
		return "alarm [msg=" + msg + ", no=" + no + "]";
	}
}
