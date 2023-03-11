package study.shoppingCollector.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import study.shoppingCollector.annotation.QueryStringArgResolver;
import study.shoppingCollector.model.dto.Category;
import study.shoppingCollector.model.dto.ChangeParameter;
import study.shoppingCollector.model.dto.UpdateCategoryName;
import study.shoppingCollector.model.dto.User;
import study.shoppingCollector.service.ChangeService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.sql.Timestamp;
import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
public class ChangeController {
    private final ChangeService changeService;
    private final ObjectMapper mapper = new ObjectMapper();
    public User user;

    @PutMapping("/inventory/product/{targetColumn}")
    public ResponseEntity<HttpStatus> putParameter(@RequestBody String param, HttpServletRequest request,
                                                   @PathVariable(value = "targetColumn") String targetColumn) throws JsonProcessingException {

        HttpSession session = request.getSession(false);

        user = (User)session.getAttribute(session.getId());
        List<ChangeParameter> params = mapper.readValue(param, new TypeReference<>() {});

        for(ChangeParameter CP : params)
        {
            CP.setUser_id(user.getUser_id());
            switch (targetColumn){
                case "name":
                    changeService.updateProductName(CP);
                    break;
                case "manufacturer":
                    changeService.updateManufacturer(CP);
                    break;
                case "warehouseDate":
                    changeService.updateWarehouseDate(CP);
                    break;
                case "unit":
                    changeService.updateUnit(CP);
                    break;
                case "category":
                    Category category = new Category();
                    category.setUser_id(1);
                    category.setName(CP.getNewCategoryNm());
                    category = changeService.getCategory(category);

                    CP.setNewCategoryId(category.getCategory_id());
                    changeService.updateCategory(CP);
                    break;
            }
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/inventory/category")
    public ResponseEntity<HttpStatus> putCategory(@QueryStringArgResolver UpdateCategoryName updateCategoryName,
                                                  HttpServletRequest request)
    {
        HttpSession session = request.getSession(false);

        user = (User)session.getAttribute(session.getId());
        Category checkCategory = new Category();
        checkCategory.setUser_id(user.getUser_id());
        checkCategory.setName(updateCategoryName.getNewCategoryName());

        if(changeService.getCategory(checkCategory) == null)
        {
            updateCategoryName.setUser_id(user.getUser_id());
            changeService.updateCategoryName(updateCategoryName);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
