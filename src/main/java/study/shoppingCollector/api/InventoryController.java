package study.shoppingCollector.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import study.shoppingCollector.annotation.QueryStringArgResolver;
import study.shoppingCollector.model.dto.*;
import study.shoppingCollector.service.TestService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
public class InventoryController {

    private final TestService testService;
    private final ObjectMapper mapper = new ObjectMapper();
    private User user;

    @GetMapping("/inventory/categories")
    public ResponseEntity<List<Category>> categories(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession(false);
        user = (User)session.getAttribute(session.getId());
        List<Category> list = testService.getAllCategoryList(user);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/inventory/product")
    public ResponseEntity<List<Item>> items(@RequestParam(value = "categoryName") String categoryName, @RequestParam(value = "query") String query, HttpServletRequest request) {
        List<Item> items;
        List<Item> childs;

        Category category = testService.getCategory(new Category(categoryName, 0, user.getUser_id()));

        items = category == null ? testService.selectAllItems(user.getUser_id()) : testService.getItemInCategory(category);

        for (Item item : items) {
            item.setCategoryName(testService.selectCategoryName(item.getCategory_id()));
            childs = testService.selectChildItem(item);

            for(Item child : childs)
                child.setCategoryName(testService.selectCategoryName(child.getCategory_id()));

            item.setChildProductList(childs);
        }
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @PostMapping("/inventory/product")
    public ResponseEntity<HttpStatus> insertItem(@RequestBody String param) throws JsonProcessingException {
        Category category;
        List<Item> items = mapper.readValue(param, new TypeReference<>() {});

        for (Item item : items)
        {
            category = testService.getCategory(new Category(item.getCategoryName(), 0, user.getUser_id()));
            item.setCategory_id(category.getCategory_id());
            item.setChildProductList(new ArrayList<>());
            testService.insertItem(item);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/inventory/category")
    public ResponseEntity<HttpStatus> insertCategory(@RequestParam(value = "categoryName") String categoryName)
    {
        Category category = new Category();
        category.setUser_id(user.getUser_id());
        category.setName(categoryName);
        testService.insertCategory(category);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/inventory/product-link")
    public ResponseEntity<HttpStatus> insertProdLink(@RequestBody List<Map<String,Object>> param)
    {
        Item parentItem;
        Item childItem;
        Composite composite = new Composite();
        for(Map<String,Object> product : param)
        {
            parentItem = testService.selectOneItem(product.get("parentProdNm"));
            childItem = testService.selectOneItem(product.get("childProdNm"));
            composite.setItem_id(parentItem.getItem_id());
            composite.setReference_id(childItem.getItem_id());
            testService.insertChild(composite);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
