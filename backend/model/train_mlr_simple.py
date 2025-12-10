import argparse
import pandas as pd
import joblib
from pathlib import Path

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, accuracy_score

def load_data(csv_path):
    df = pd.read_csv(csv_path)
    X = df[['accuracy', 'avg_time', 'hints_used']]
    y = df['label'].astype(int)
    return X, y

def main(args):
    out_dir = Path(args.output_dir)
    out_dir.mkdir(parents=True, exist_ok=True)

    # 1. Loadanje podataka
    X, y = load_data(args.csv)

    # 2. Splitanje na train/test
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=args.test_size, random_state=args.seed, stratify=y
    )

    # skaliranje + logreg
    pipe = Pipeline([
        ('scaler', StandardScaler()),
        ('clf', LogisticRegression(multi_class='multinomial', solver='lbfgs', max_iter=1000, C=1.0, class_weight='balanced'))
    ])

    # trening
    pipe.fit(X_train, y_train)

    # evaluacija
    y_pred = pipe.predict(X_test)
    print("Accuracy:", accuracy_score(y_test, y_pred))
    print(classification_report(y_test, y_pred))

    # save
    joblib.dump(pipe, out_dir / "mlr_model.pkl")
    print("Spremljeno u:", out_dir / "mlr_model.pkl")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--csv", type=str, default="train_dataset.csv")
    parser.add_argument("--output_dir", type=str, default="model_output_simple")
    parser.add_argument("--test_size", type=float, default=0.2)
    parser.add_argument("--seed", type=int, default=42)
    args = parser.parse_args()
    main(args)
