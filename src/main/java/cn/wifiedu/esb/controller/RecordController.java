package cn.wifiedu.esb.controller;


import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.Reader;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import cn.wifiedu.core.controller.BaseController;
import cn.wifiedu.core.service.OpenService;

@Controller  
@Scope("prototype")
public class RecordController extends BaseController{  

	@Resource
	OpenService openService;

	public OpenService getOpenService() {
		return openService;
	}

	public void setOpenService(OpenService openService) {
		this.openService = openService;
	}

	//添加－查询文章访问纪录
	@RequestMapping("/Record_queryForObject_docVisitedRecord") 
	public void docVisitedRecord(HttpServletRequest request,HttpSession session) {
		try {
			Map<String, Object> map = getParameterMap();
			map.put("sqlMapId", "DocumentFindById");
			Map<String, Object> hm = (Map) openService.queryForObject(map);
			
			map.put("DOCCHANNEL", hm.get("DOCCONTENT"));
			map.put("SITEID", hm.get("SITEID"));
			map.put("sqlMapId", "VisitRecordInsert");
			openService.insert(map);
			
			map.put("sqlMapId", "findDocVisitedNum");
			hm.put("DocVisitedNum", openService.queryForObject(map));
			
			output("0000", hm);
		} catch (Exception e) {
			output("9999"," Exception ",e);
		}
	}
	
	//获取文件夹下所有文件夹的名称
	public static List<String>  getFileName(String path) {
		List<String> list = new ArrayList<String>();
		
	    File f = new File(path);
	    if (!f.exists()) {
	      System.out.println(path + " not exists");
	      return list;
	    }
	    File fa[] = f.listFiles();
	    for (int i = 0; i < fa.length; i++) {
	      File fs = fa[i];
	      if (fs.isDirectory()) {
	        //System.out.println(fs.getName() );
	        list.add(fs.getName());
	      } else {
	        //System.out.println(fs.getName());
	      }
	    }
	    return list;
	  }
	
	/**
     * 获取某个文件夹下的所有文件
     *
     * @param fileNameList 存放文件名称的list
     * @param path 文件夹的路径
     * @return
     */
    public static List<String> getAllFileName(String path) {
    	List<String> list = new ArrayList<String>();
        File file = new File(path);
        File[] tempList = file.listFiles();
        for (int i = 0; i < tempList.length; i++) {
            if (tempList[i].isFile()) {
            	list.add(tempList[i].getName());
            	//System.out.println(tempList[i].getName());
            }
        }
        return list;
    }

    public static StringBuffer fileRead(String path) throws Exception {
    	System.out.println(path);
    	StringBuffer sb=new StringBuffer();
		BufferedReader ready;
		try {
		ready = new BufferedReader(new InputStreamReader(new FileInputStream(new File(path)), "GBK"));
		String temp="";
		while(null!=(temp=ready.readLine())){
		             sb.append(temp);
		             System.out.println(temp);
		}
		return sb;
		} catch (Exception e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
		}
		return sb;
    	
    	
       /* File file = new File(path);//定义一个file对象，用来初始化FileReader
        FileReader reader = new FileReader(file);//定义一个fileReader对象，用来初始化BufferedReader
        BufferedReader bReader = new BufferedReader(reader);//new一个BufferedReader对象，将文件内容读取到缓存
        StringBuilder sb = new StringBuilder();//定义一个字符串缓存，将字符串存放缓存中
        String s = "";
        while ((s =bReader.readLine()) != null) {//逐行读取文件内容，不读取换行符和末尾的空格
            sb.append(s + "\n");//将读取的字符串添加换行符后累加存放在缓存中
            //System.out.println(s);
        }
        bReader.close();
        String str = sb.toString();
        //System.out.println(str);
        return str;*/
    }
	
 
	public static void main(String[] args) throws Exception {
		String initPath = "C:/My/wz/gsgg/";
		
		//获取文件夹下所有文件夹
		List<String> dicList = getFileName(initPath);
		for(int i=0; i<dicList.size(); i++) {
			
			//获取文件夹下所有文件的名称，不包括文件夹
			List<String> fileList = getAllFileName(initPath + dicList.get(i));
			//循环某个文件夹，如201701
			for(int j=0; j<fileList.size(); j++) {
				//如果该文件夹下存在附件
				if(fileList.get(j).indexOf("P020") >= 0) {
					String fjName = fileList.get(j).substring(2, 8); //文件名中的日期
					String fjNameA = fileList.get(j); //文件全名
					//重新循环该文件夹，取类似名字的htm文件
					for(int k=0; k<fileList.size(); k++) {
						//找到类似名字的htm文件解析，查找
						if(fileList.get(k).indexOf(fjName) >= 0 &&  fileList.get(k).indexOf("t") >= 0) {
							//在这里跑乱码，单独跑方法不乱骂
							StringBuffer fileContent = fileRead(initPath + dicList.get(i) +"\\"+fjNameA);
							//System.out.println(fileContent);
							//读取本地文件内容，查找文件内容里是否有附件名称(此处乱码，未处理)
							//取有附件名的htm文件内容-解析
							//更新数据库表
					}
				}
			}
		}
	}
}
	@RequestMapping("getFuJian")
	public void dataBaseFujian() {
		try {
			String initPath = "C:/My/wz/gsgg/";
			
			//获取文件夹下所有文件夹
			List<String> dicList = getFileName(initPath);
			for(int i=0; i<dicList.size(); i++) {
				//获取文件夹下所有文件的名称，不包括文件夹
				getAllFileName(initPath + dicList.get(i));
			}
			
		}catch (Exception e) {
			// TODO: handle exception
			output("9999",e);
		}
	}
}
