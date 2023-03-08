package study.shoppingCollector.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import study.shoppingCollector.model.dto.Category;
import study.shoppingCollector.model.dto.Composite;
import study.shoppingCollector.model.dto.Item;
import study.shoppingCollector.model.dto.User;
import study.shoppingCollector.service.TestService;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
public class DeleteController {
    private final TestService testService;
    private final ObjectMapper mapper = new ObjectMapper();
    public final User user = new User(1,"jasd0330@naver.com","12341234", new Timestamp(System.currentTimeMillis()), new Timestamp(System.currentTimeMillis()));

    @DeleteMapping("/inventory/category")
    public ResponseEntity<HttpStatus> deleteCategory(@RequestParam(value = "categoryName") String categoryName)
    {
        Category category = new Category();
        category.setUser_id(1);
        category.setName(categoryName);
        testService.deleteCategory(category);

        return new ResponseEntity<>(HttpStatus.OK);
    }
    @DeleteMapping("/inventory/product")
    public ResponseEntity<HttpStatus> deleteProduct(@RequestBody List<String> param)
    {
        for (String name : param)
            testService.deleteProduct(name);
        return new ResponseEntity<>(HttpStatus.OK);

    }

    @DeleteMapping("/inventory/product-link")
    public ResponseEntity<HttpStatus> deleteProdLink(@RequestBody List<Map<String,Object>> param) {
        Item parentItem;
        Item childItem;
        Composite composite = new Composite();
        for(Map<String,Object> product : param)
        {
            parentItem = testService.selectOneItem(product.get("parentProdNm"));
            childItem = testService.selectOneItem(product.get("childProdNm"));
            composite.setItem_id(parentItem.getItem_id());
            composite.setReference_id(childItem.getItem_id());
            testService.deleteChild(composite);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
