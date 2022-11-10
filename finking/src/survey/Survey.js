import "./style.css"; //css import
import React, { useState } from "react";

import { doc, getDoc, updateDoc, collection } from "firebase/firestore";
import { dbService } from "firebaseInstance";
import { useHistory } from "react-router-dom";

const Survey = ({ userObj }) => {
  const [values, setValues] = useState("");
  const [name, setName] = useState("");
  const history = useHistory();
  const [form, setForm] = useState({
    age: "10`s",
    balance: "low",
    minus: "zero",
    income: "1000",
    debt: "1000",
    ratio: "row",
    exp: "zero",
    structure: "zero",
    purpose: "financial",
    period: "oneday",
    industry: "electronic",
    industry2: "electronic",
    country: "korea",
    check: "0",
  });

  const Setusermind = async () => {
    let age = "0";
    let balance = "0";
    let minus = "0";
    let income = "0";
    let debt = "0";
    let ratio = "0";
    let exp = "0";
    let purpose = "0";
    let structure = "0";
    let period = "0";
    let industry = "0";
    let industry2 = "0";
    let country = "0";
    let check = "0";
    let code = "0";

    if (form.age === "10`s") age = "1";
    else if (form.age === "20`s") age = "2";
    else if (form.age === "30`s") age = "3";
    else if (form.age === "40`s") age = "4";
    else if (form.age === "50`s") age = "5";
    else if (form.age === "60`s") age = "6";
    else age = "-1";

    if (form.balance === "low") balance = "1";
    else if (form.balance === "lowreturn") balance = "2";
    else if (form.balance === "middle") balance = "3";
    else if (form.balance === "middlehigh") balance = "4";
    else if (form.balance === "highreturn") balance = "5";
    else balance = "-1";

    if (form.minus === "zero") minus = "1";
    else if (form.minus === "5per") minus = "2";
    else if (form.minus === "10per") minus = "3";
    else if (form.minus === "nothing") minus = "4";
    else minus = "-1";

    if (form.income === "1000") income = "1";
    else if (form.income === "3000under") income = "2";
    else if (form.income === "5000under") income = "3";
    else if (form.income === "5000over") income = "4";
    else income = "-1";

    if (form.debt === "1000") debt = "1";
    else if (form.debt === "3000under") debt = "2";
    else if (form.debt === "5000under") debt = "3";
    else if (form.debt === "5000over") debt = "4";
    else debt = "-1";

    if (form.ratio === "row") ratio = "1";
    else if (form.ratio === "lesshalf") ratio = "2";
    else if (form.ratio === "half") ratio = "3";
    else if (form.ratio === "morehalf") ratio = "4";
    else if (form.ratio === "all") ratio = "5";
    else ratio = "-1";

    if (form.exp === "zero") exp = "1";
    else if (form.exp === "1year") exp = "2";
    else if (form.exp === "1_3year") exp = "3";
    else if (form.exp === "3year_over") exp = "4";
    else exp = "-1";

    if (form.structure === "zero") structure = "1";
    else if (form.structure === "less") structure = "2";
    else if (form.structure === "more") structure = "3";
    else if (form.structure === "all") structure = "4";
    else structure = "-1";

    if (form.purpose === "financial") purpose = "1";
    else if (form.purpose === "living") purpose = "2";
    else if (form.purpose === "spare") purpose = "3";
    else if (form.purpose === "growth") purpose = "4";
    else purpose = "-1";

    if (form.period === "oneday") period = "1";
    else if (form.period === "1year") period = "2";
    else if (form.period === "2year") period = "3";
    else if (form.period === "long") period = "4";
    else period = "-1";

    if (form.industry === "electronic") industry = "1";
    else if (form.industry === "medical") industry = "2";
    else if (form.industry === "chemistry") industry = "3";
    else if (form.industry === "communication") industry = "4";
    else if (form.industry === "finance") industry = "5";
    else if (form.industry === "car") industry = "6";
    else if (form.industry === "construction") industry = "7";
    else if (form.industry === "insurance") industry = "8";
    else if (form.industry === "it") industry = "9";
    else if (form.industry === "food") industry = "0";
    else industry = "-1";

    if (form.industry2 === "electronic") industry2 = "1";
    else if (form.industry2 === "medical") industry2 = "2";
    else if (form.industry2 === "chemistry") industry2 = "3";
    else if (form.industry2 === "communication") industry2 = "4";
    else if (form.industry2 === "finance") industry2 = "5";
    else if (form.industry2 === "car") industry2 = "6";
    else if (form.industry2 === "construction") industry2 = "7";
    else if (form.industry2 === "insurance") industry2 = "8";
    else if (form.industry2 === "it") industry2 = "9";
    else if (form.industry2 === "food") industry2 = "0";
    else industry2 = "-1";

    if (form.country === "korea") country = "1";
    else if (form.country === "usa") country = "2";
    else if (form.country === "all") country = "3";
    else country = "-1";

    code = `${age}${balance}${minus}${income}${debt}${ratio}${exp}${purpose}${structure}${period}${industry}${industry2}${country}`;

    await updateDoc(doc(dbService, "user", userObj.email), {
      usercode: code,
    });
    //  onClickprofile();
  };
  const onClickprofile = () => {
    history.push("/profile");
  };

  const hadleChange = (e) => {
    const { name, values } = e.target;
    setForm({
      ...form,
      [name]: e.target.value,
    });
    console.log(e.target.value);
    console.log(form);
  };

  return (
    <>
      <div className="wrap">
        <h1 className="surveytext_Logo">Finking Survey</h1>
        <button className="sur_exit" onClick={onClickprofile}>
          X
        </button>
        <form>
          <p className="surveytext">
            <label>당신의 연령대를 선택해주세요. </label>
          </p>
          <div
            className="survey"
            name={name}
            value={values}
            onChange={hadleChange}
          >
            <input type="radio" name="age" value="10`s" />
            <label htmlFor="10`s">10대</label>
            <input type="radio" name="age" value="20`s" />
            <label htmlFor="10`s">20대</label>
            <input type="radio" name="age" value="30`s" />
            <label htmlFor="10`s">30대</label>
            <input type="radio" name="age" value="40`s" />
            <label htmlFor="10`s">40대</label>
            <input type="radio" name="age" value="50`s" />
            <label htmlFor="10`s">50대</label>
            <input type="radio" name="age" value="60`s" />
            <label htmlFor="10`s">60대 이상</label>
          </div>

          <p className="surveytext">
            <label>
              투자할 때 생각하시는 수익과 위험의 밸런스는 어느 정도이신가요{" "}
            </label>
          </p>
          <div
            className="survey"
            name={name}
            value={values}
            onChange={hadleChange}
          >
            <input type="radio" name="balance" value="low" />
            낮은 위험
            <input type="radio" name="balance" value="lowreturn" />
            낮은위험 낮은 수익
            <input type="radio" name="balance" value="middle" />
            적당한 위험 적당한 수익
            <input type="radio" name="balance" value="middlehigh" />
            높은위험 높은 수익
            <input type="radio" name="balance" value="highreturn" />
            높은 수익
          </div>

          <p className="surveytext">
            <label>투자할 때 손실이 발생한다면 어느 정도 견딜 수 있나요 </label>
          </p>
          <div
            className="survey"
            name={name}
            value={values}
            onChange={hadleChange}
          >
            <input type="radio" name="minus" value="zero" />
            X
            <input type="radio" name="minus" value="5per" />
            5%
            <input type="radio" name="minus" value="10per" />
            10%
            <input type="radio" name="minus" value="nothing" />
            상관없다
          </div>

          <p className="surveytext">
            <label>연간 소득은 어느 정도이신가요? </label>
          </p>
          <div
            className="survey"
            name={name}
            value={values}
            onChange={hadleChange}
          >
            <input type="radio" name="income" value="1000" />
            1000만원 이하
            <input type="radio" name="income" value="3000under" />
            1000만원 ~ 3000만원
            <input type="radio" name="income" value="5000under" />
            3000만원 ~ 5000만원
            <input type="radio" name="income" value="5000over" />
            5000만원 이상
          </div>

          <p className="surveytext">
            <label>보유하신 부채는 어느 정도이신가요? </label>
          </p>
          <div
            className="survey"
            name={name}
            value={values}
            onChange={hadleChange}
          >
            <input type="radio" name="debt" value="1000" />
            1000만원 이하
            <input type="radio" name="debt" value="3000under" />
            1000만원 ~ 3000만원
            <input type="radio" name="debt" value="5000under" />
            3000만원 ~ 5000만원
            <input type="radio" name="debt" value="5000over" />
            5000만원 이상
          </div>

          <p className="surveytext">
            <label>재산중 투자의 비율은 어느 정도 이신가요? </label>
          </p>
          <div
            className="survey"
            name={name}
            value={values}
            onChange={hadleChange}
          >
            <input type="radio" name="ratio" value="row" />
            거의 없음
            <input type="radio" name="ratio" value="lesshalf" />
            절반 이하
            <input type="radio" name="ratio" value="half" />
            절반
            <input type="radio" name="ratio" value="morehalf" />
            절반 이상
            <input type="radio" name="ratio" value="all" />
            거의 전부
          </div>

          <p className="surveytext">
            <label>주식이나 펀드등 금융투자 경험이 있으신가요? </label>
          </p>
          <div
            className="survey"
            name={name}
            value={values}
            onChange={hadleChange}
          >
            <input type="radio" name="exp" value="zero" />
            경험 없음
            <input type="radio" name="exp" value="1year" />
            1년 미만
            <input type="radio" name="exp" value="1_3year" />
            1년~3년
            <input type="radio" name="exp" value="3year_over" />
            3년 이상
          </div>

          <p className="surveytext">
            <label>
              주식이나 펀드등 금융투자의 구조, 위험에 대해 이해하고 계신가요?{" "}
            </label>
          </p>
          <div
            className="survey"
            name={name}
            value={values}
            onChange={hadleChange}
          >
            <input type="radio" name="structure" value="zero" />
            모른다
            <input type="radio" name="structure" value="less" />
            조금 이해
            <input type="radio" name="structure" value="more" />
            많이 이해
            <input type="radio" name="structure" value="all" />
            대부분 전부 이해한다
          </div>

          <p className="surveytext">
            <label>금융 투자의 목적이 무엇인가요? </label>
          </p>
          <div
            className="survey"
            name={name}
            value={values}
            onChange={hadleChange}
          >
            <input type="radio" name="purpose" value="financial" />
            채무상환
            <input type="radio" name="purpose" value="living" />
            생활비, 학비 등 필수자금
            <input type="radio" name="purpose" value="spare" />
            여유자금
            <input type="radio" name="purpose" value="growth" />
            자산 증식
          </div>

          <p className="surveytext">
            <label>예상 투자 기간은 얼마나 되시나요? </label>
          </p>
          <div
            className="survey"
            name={name}
            value={values}
            onChange={hadleChange}
          >
            <input type="radio" name="period" value="oneday" />
            단기
            <input type="radio" name="period" value="1year" />
            1년
            <input type="radio" name="period" value="2year" />
            2년
            <input type="radio" name="period" value="long" />그 이상
          </div>

          <p className="surveytext">
            <label>따로 선호하는 업종이 있나요? 1순위</label>
          </p>
          <div
            className="survey"
            name={name}
            value={values}
            onChange={hadleChange}
          >
            <input type="radio" name="industry" value="electronic" />
            전기전자(삼성전자, LG, SK)
            <input type="radio" name="industry" value="medical" />
            의료(삼성 바이오, 셀트리온)
            <input type="radio" name="industry" value="chemistry" />
            화학(LG화학, SK이노베이션)
            <input type="radio" name="industry" value="communication" />
            통신(SK텔레콤, KT)
            <input type="radio" name="industry" value="finance" />
            금융(은행)
            <input type="radio" name="industry" value="car" />
            자동차(KIA, 현대)
            <input type="radio" name="industry" value="construction " />
            건설업(현대건설, 삼부토건)
            <input type="radio" name="industry" value="insurance" />
            보험(삼성화재, 현대해상)
            <input type="radio" name="industry" value="it" />
            IT(카카오, 네이버, 크래프톤)
            <input type="radio" name="industry" value="food" />
            음식료품(CJ제일제당, 농심, 하이트진로)
          </div>

          <p className="surveytext">
            <label>따로 선호하는 업종이 있나요? 2순위</label>
          </p>
          <div
            className="survey"
            name={name}
            value={values}
            onChange={hadleChange}
          >
            <input type="radio" name="industry2" value="electronic" />
            전기전자(삼성전자, LG, SK)
            <input type="radio" name="industry2" value="medical" />
            의료(삼성 바이오, 셀트리온)
            <input type="radio" name="industry2" value="chemistry" />
            화학(LG화학, SK이노베이션)
            <input type="radio" name="industry2" value="communication" />
            통신(SK텔레콤, KT)
            <input type="radio" name="industry2" value="finance" />
            금융(은행)
            <input type="radio" name="industry2" value="car" />
            자동차(KIA, 현대)
            <input type="radio" name="industry2" value="construction" />
            건설업(현대건설, 삼부토건)
            <input type="radio" name="industry2" value="insurance" />
            보험(삼성화재, 현대해상)
            <input type="radio" name="industry2" value="it" />
            IT(카카오, 네이버, 크래프톤)
            <input type="radio" name="industry2" value="food" />
            음식료품(CJ제일제당, 농심, 하이트진로)
          </div>

          <p className="surveytext">
            <label>주식 투자에 있어 선호하는 나라가 있나요? </label>
          </p>
          <div
            className="survey"
            name={name}
            value={values}
            onChange={hadleChange}
          >
            <input type="radio" name="country" value="korea" />
            한국
            <input type="radio" name="country" value="usa" />
            미국
            <input type="radio" name="country" value="all" />
            상관없음
          </div>

          <p className="surveytext">
            <label>다 확인하셨나요?</label>
          </p>
          <div
            className="survey"
            name={name}
            value={values}
            onChange={hadleChange}
          >
            <input type="radio" name="check" value="1" />
            네
            <input type="radio" name="check" value="0" />
            아니요
          </div>

          <p className="surveytext">
            <input
              type="button"
              value={"확인"}
              onClick={Setusermind}
              className="save"
            />
          </p>
        </form>
      </div>
    </>
  );
};

export default Survey;
