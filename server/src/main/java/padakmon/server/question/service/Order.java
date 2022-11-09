package padakmon.server.question.service;

public enum Order {
    SCORE("score", "voteScore"),
    NEWEST("newest", "createdAt"),
    NAME("name", "tagName"),
    POPULAR("popular", "questionCount"),
    REPUTATION("reputation", "questionCount"),
    VOTERS("voters", "voteCount");

    public String orderParam;
    public String orderMode;

    Order(String orderParam, String orderMode) {
        this.orderParam = orderParam;
        this.orderMode = orderMode;
    }
}

