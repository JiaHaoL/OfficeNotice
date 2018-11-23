package cn.wifiedu.esb.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;

public class DataBaseSynController {
	public static void main(String[] args) {
		StringBuffer sb=new StringBuffer();
    	String str = "";
		BufferedReader ready;
		try {
		ready = new BufferedReader(new InputStreamReader(new FileInputStream(new File("C:/My/wz/gsgg/201701/t20170122_169384.htm")), "GBK"));
		String temp="";
		while(null!=(temp=ready.readLine())){
		             sb.append(temp);
		             System.out.println(temp);
		}
		} catch (Exception e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
		}
	}
	
	public static void readFileContent(String path) {
		StringBuffer sb=new StringBuffer();
    	String str = "";
		BufferedReader ready;
		try {
		ready = new BufferedReader(new InputStreamReader(new FileInputStream(new File(path)), "GBK"));
		String temp="";
		while(null!=(temp=ready.readLine())){
		             sb.append(temp);
		             System.out.println(temp);
		}
		} catch (Exception e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
		}
	}
	
}
