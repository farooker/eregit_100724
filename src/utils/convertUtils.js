const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
const questionnaireDisabled = (Sections = []) => {
  const Question = [...Sections];
  const NextSections = [...Sections];
  const NextQuestionId = [];
  NextSections.forEach((item) => {
    switch (item.data.controlType) {
      case "Paragraph":
        NextQuestionId.push(item.data.metaData.nextQuestionId);
        break;
      case "Multichoice":
        NextQuestionId.push(
          ...Array.from(item.data.metaData.choices, (x) => x.nextQuestionId)
        );
        break;
      case "Checkbox":
        NextQuestionId.push(
          ...Array.from(item.data.metaData.choices, (x) => x.nextQuestionId)
        );
        break;
      case "Dropdown":
        NextQuestionId.push(
          ...Array.from(item.data.metaData.choices, (x) => x.nextQuestionId)
        );
        break;
      case "Uploads":
        NextQuestionId.push(item.data.metaData.nextQuestionId);
        break;
    }
  });

  for (let index = 0; index < NextQuestionId.length; index++) {
    if (NextQuestionId[index] !== 0) {
      const nextId = NextQuestionId[index];
      Question.forEach((item) => {
        if (item.id === nextId) {
          item.disabled = true;
        }
      });
    }
  }
  return Question;
};
const questionnaireAnswer = async (question) => {
  const answers = [];
  for (let i = 0; i < question.length; i++) {
    if (!question[i].disabled)
      switch (question[i].data.controlType) {
        case "Paragraph":
          {
            answers.push({
              question_id: question[i].id,
              answer: question[i].data.metaData.answer ?? "",
            });
          }
          break;
        case "Multichoice":
          {
            const answer = question[i].data.metaData.answer;
            const choices = question[i].data.metaData.choices;
            const selected = choices.find((x) => x.id === answer);
            const selectedId = selected?.id;
            const selectedOther = selected?.specify;
            answers.push({
              question_id: question[i].id,
              answer:
                selected?.title === "other"
                  ? `${selectedId}|${selectedOther}`
                  : selectedId ?? "",
            });
          }

          break;
        case "Checkbox":
          {
            const checked = question[i].data.metaData.answer;
            const choices = question[i].data.metaData.choices;
            // const tempAnswer = [];
            const selecteds = [];
            checked.forEach((id) => {
              const selected = choices.find((x) => x.id === id);
              selecteds.push(selected);
              //  const  selectedId = selected?.id
              //  const  selectedOther = selected?.specify
              //  tempAnswer.push({
              //   question_id: question[i].id,
              //   answer:  (selected?.title === 'other') ? `${selectedId}|${selectedOther}` : selectedId ?? ""
              // })
            });
            // throw Error(JSON.stringify(checked))
            const selectedIds = selecteds.map((x) => {
              const selectedId = x?.id;
              const selectedOther = x?.specify;
              return x?.title === "other"
                ? `${selectedId}|${selectedOther}`
                : selectedId ?? "";
            });
            answers.push({
              question_id: question[i].id,
              answer: selectedIds.join(","),
            });
            // console.log(JSON.stringify(answers))
            // throw Error(JSON.stringify(answers))
          }
          break;
        case "Dropdown":
          {
            answers.push({
              question_id: question[i].id,
              answer: question[i].data.metaData.answer ?? "",
            });
          }
          break;
        case "Uploads":
          {
            const file = question[i].data.metaData.files;
            answers.push({
              question_id: question[i].id,
              answer: file ? await getBase64(file) : "",
            });
          }
          break;
      }
  }
  return answers;
};

export default { getBase64, questionnaireAnswer, questionnaireDisabled };
