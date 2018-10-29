package cn.wifiedu.esb.controller;


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
}
