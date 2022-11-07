import Tag from '../../../components/Tag/';
import {
  TagsContainer,
  TagNameDiv,
  TagInfoDiv,
  TagInfo,
  TagCountDiv,
  QuestionTotal,
  TodayTotal,
  WeekTotal,
} from './style';

const Tags = ({ list }) => {
  return (
    <TagsContainer>
      <TagNameDiv>
        <Tag name={list.tagName}></Tag>
      </TagNameDiv>
      <TagInfoDiv>
        <TagInfo>{list.tagDescription}</TagInfo>
      </TagInfoDiv>
      <TagCountDiv>
        <QuestionTotal>
          <div>{list.questionCountTotal}</div>
          <div>questions</div>
        </QuestionTotal>
        <TodayTotal>
          <div>{list.questionCountToday}</div>
          <div>asked today</div>
        </TodayTotal>
        <WeekTotal>
          <div>{list.questionCountWeek}</div>
          <div>this week</div>
        </WeekTotal>
      </TagCountDiv>
    </TagsContainer>
  );
};

export default Tags;
