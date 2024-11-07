import {style} from "@vanilla-extract/css";
import {vars} from "../../App.css.ts";

export const container = style({
    display: "flex",
    // 기본값
    flexDirection: "row",
    // 펼치지는 방향으로, 중앙에 맞춰줌.
    alignItems: 'center',
    // 공간이 줄어들었을 때, 자동으로 아래 줄로 가도록 유도.
    flexWrap: 'wrap',
    // 줄 사이의 공간
    rowGap: 15,
    minHeight: 'max-content',
    padding: vars.spacing.big2,
    backgroundColor: vars.color.mainDarker
});

export const title = style({
    color: vars.color.brightText,
    fontSize: vars.fontSizing.T2,
    marginRight: vars.spacing.big1
});

export const addButton = style({
    color : vars.color.brightText,
    fontSize: vars.fontSizing.T2,
    cursor: 'pointer',
    marginLeft: vars.spacing.big1,
    ":hover": {
        opacity: 0.8
    }
});

export const boardItem = style({
    color: vars.color.brightText,
    fontSize: vars.fontSizing.T3,
    backgroundColor: vars.color.mainFaded,
    padding: vars.spacing.medium,
    borderRadius: 10,
    cursor: "pointer",
    marginLeft: vars.spacing.big2,
    marginRight: vars.spacing.big2,
    ":hover" : {
        opacity: 0.8,
        transform: "scale(1.03)"
    }
});

export const boardItemActive = style({
    color: vars.color.brightText,
    fontSize: vars.fontSizing.T3,
    backgroundColor: vars.color.selectedTab,
    boxShadow: vars.shadow.basic,
    padding: vars.spacing.medium,
    borderRadius: 10,
    cursor: "pointer",
    marginLeft: vars.spacing.big2,
    marginRight: vars.spacing.big2
});

export const addSection = style({
    display: "flex",
    alignItems: "center",
    marginLeft: "auto"
});

export const smallTitle = style({
    color: vars.color.brightText,
    fontSize: vars.fontSizing.T3
})