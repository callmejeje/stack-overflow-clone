package padakmon.server.question.controller;

import lombok.SneakyThrows;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import padakmon.server.dto.PageInfo;
import padakmon.server.question.dto.QuestionDto;
import padakmon.server.question.dto.QuestionSearchDto;
import padakmon.server.question.entity.Question;
import padakmon.server.question.mapper.QuestionSearchMapper;
import padakmon.server.question.service.QuestionSearchService;
import javax.validation.constraints.Positive;
import java.net.URLDecoder;
import java.util.List;

@RestController
@RequestMapping("/api")
@Validated
public class QuestionSearchController {

    private final QuestionSearchService questionSearchService;
    private final QuestionSearchMapper mapper;

    public QuestionSearchController(QuestionSearchService questionSearchService, QuestionSearchMapper mapper) {
        this.questionSearchService = questionSearchService;
        this.mapper = mapper;
    }

    @GetMapping
    public ResponseEntity getTopQuestions() {
        String orderMode = questionSearchService.getOrderMode(null);
        Page<Question> questionPage =questionSearchService.findQuestions(0, 20, Sort.by(orderMode).descending());
        List<Question> questions = questionPage.getContent();

        List<QuestionDto.GetResponse> responsePage = mapper.questionsToPageResponses(questions);

        return new ResponseEntity(new QuestionSearchDto(responsePage), HttpStatus.OK);
    }


    @SneakyThrows
    @GetMapping( "/questions")
    public ResponseEntity getOrderQuery(@RequestParam(name = "query", required = false) String query,
                                        @RequestParam(name = "order", required = false) String order,
                                        @Positive @RequestParam(name = "page", required = false, defaultValue = "1") int page,
                                        @Positive @RequestParam(name = "size", required = false, defaultValue = "15") int size) {

        String orderMode = questionSearchService.getOrderMode(order);

        //쿼리가 있으면 쿼리로 검색하고 아니면 최근껄로 뿌림.
        Page<Question> questionPage;
        QuestionSearchDto.SearchInfo searchInfo = new QuestionSearchDto.SearchInfo();
        if (query == null) {
            questionPage = questionSearchService.findQuestions(page - 1, size, Sort.by(orderMode).descending());
        } else {
            query = URLDecoder.decode(query, "UTF-8");
            questionPage = questionSearchService.delegateSearch(query, page - 1, size, Sort.by(orderMode).descending());
            questionSearchService.setSearchInfo(query, searchInfo);
        }

        PageInfo pageInfo = PageInfo.of(questionPage, page, size);
        List<Question> questions = questionPage.getContent();

        List<QuestionDto.GetResponse> responsePage = mapper.questionsToPageResponses(questions);

        return new ResponseEntity(new QuestionSearchDto(order, searchInfo, pageInfo, responsePage), HttpStatus.OK);
    }
}
